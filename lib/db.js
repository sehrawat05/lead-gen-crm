import clientPromise from "./mongodb"

export async function getLeads() {
  const client = await clientPromise
  const db = client.db()
  const leads = await db.collection("leads").find({}).sort({ dateAcquired: -1 }).toArray()
  return JSON.parse(JSON.stringify(leads))
}

export async function getLeadById(id) {
  const client = await clientPromise
  const db = client.db()
  const lead = await db.collection("leads").findOne({ _id: id })
  return JSON.parse(JSON.stringify(lead))
}

export async function createLead(leadData) {
  const client = await clientPromise
  const db = client.db()
  const result = await db.collection("leads").insertOne({
    ...leadData,
    dateAcquired: new Date(),
  })
  return result
}

export async function updateLead(id, leadData) {
  const client = await clientPromise
  const db = client.db()
  const result = await db.collection("leads").updateOne({ _id: id }, { $set: leadData })
  return result
}

export async function deleteLead(id) {
  const client = await clientPromise
  const db = client.db()
  const result = await db.collection("leads").deleteOne({ _id: id })
  return result
}

export async function getOutreachCampaigns() {
  const client = await clientPromise
  const db = client.db()
  const campaigns = await db.collection("campaigns").find({}).sort({ createdAt: -1 }).toArray()
  return JSON.parse(JSON.stringify(campaigns))
}

export async function createOutreachCampaign(campaignData) {
  const client = await clientPromise
  const db = client.db()
  const result = await db.collection("campaigns").insertOne({
    ...campaignData,
    createdAt: new Date(),
    emailsSent: 0,
    emailsOpened: 0,
    replies: 0,
  })
  return result
}

export async function getDashboardStats() {
  const client = await clientPromise
  const db = client.db()

  const totalLeads = await db.collection("leads").countDocuments()
  const contactedLeads = await db.collection("leads").countDocuments({ status: "Contacted" })
  const meetings = await db.collection("leads").countDocuments({ status: "Meeting Scheduled" })

  const emailsSent = await db.collection("emails").countDocuments()
  const emailsOpened = await db.collection("emails").countDocuments({ opened: true })
  const replies = await db.collection("emails").countDocuments({ replied: true })

  // Get leads over time (last 10 days)
  const now = new Date()
  const tenDaysAgo = new Date(now.setDate(now.getDate() - 10))

  const leadsOverTime = await db
    .collection("leads")
    .aggregate([
      {
        $match: {
          dateAcquired: { $gte: tenDaysAgo },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$dateAcquired" } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ])
    .toArray()

  return {
    totalLeads,
    contactedLeads,
    meetings,
    emailsSent,
    emailsOpened,
    replies,
    leadsOverTime: JSON.parse(JSON.stringify(leadsOverTime)),
  }
}
