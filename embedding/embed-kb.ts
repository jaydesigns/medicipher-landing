import { MongoClient } from 'mongodb'
import { getEmbedding } from './getEmbedding';

const texts = [
  "Overview: MediCipher is the Financial Operating System for Post‑Acute Care, built to eliminate revenue leakage, automate reimbursement workflows, and protect facilities from audits. It serves SNFs, multi‑facility operators, MDS Coordinators, reimbursement teams, administrators, and compliance staff while solving industry‑wide issues like 45% of facilities operating at a loss, PDPM errors causing $80–$130/day/patient leakage, 30–45% MDS turnover, and a 15.1% improper payment rate.",
  
  "CMI Tool (Revenue Optimization Engine): Provides portfolio‑wide CMI benchmarking, a Live Whiteboard for What‑If financial modeling, a state‑specific Medicaid engine, and automated detection of under‑coded assessments. Benefits include recapturing $80–$130 per patient/day, identifying systemic coding gaps, and improving corporate visibility.",
  
  "MDS Co‑Pilot (Efficiency & Retention Engine): AI prepopulates MDS sections by analyzing unstructured clinical notes, provides verifiable citations, and enables click‑to‑validate workflows. It reduces documentation time by 40–60%, prevents >$120,000 turnover costs, and delivers 16x–20x ROI.",
  
  "ADR Assistant (Audit Defense Engine): Automatically generates HIPPS Maps, assembles audit‑ready packets with one click, and creates evidence trails linking documentation to billed HIPPS codes. It protects against the 15.1% improper payment rate, reduces audit prep time from days to minutes, and minimizes clawback risk.",
  
  "Platform‑Wide Features: Unified data layer eliminating silos, AI transparency with citations and confidence scores, HIPAA‑compliant security with full audit logs, and integrations with EHRs, billing systems, and corporate reporting tools.",
  
  "Business Value Summary: Recaptures $80–$130/patient/day, prevents >$120,000 turnover costs, defends against improper payment audits, reduces documentation time by 40–60%, and eliminates the point‑solution tax through a unified suite.",
  
  "UI/UX Showcase: CMI Tool dashboard with facility‑level benchmarking and a Live Whiteboard; MDS Co‑Pilot interface showing AI‑generated prepopulation with citations and validation buttons; ADR Assistant with HIPPS Map visualization and One‑Click Packet Assembly.",
  
  "Call to Action: Primary CTA is 'Start Your 1‑Month Free Trial' and secondary CTA is 'Schedule a Demo & Start Your Free Trial', aligning with the go‑to‑market strategy to reduce adoption friction.",
  
  "FAQ: Covers how MediCipher reduces revenue leakage, how AI ensures accuracy through citations, time to value (typically within 30 days), the role of MDS Coordinators (augmented, not replaced), and why MediCipher outperforms fragmented point solutions.",
  
  "Knowledge Base Structure: Recommended folders include Overview, CMI Tool, MDS Co‑Pilot, ADR Assistant, Platform, Business Value, FAQ, and Getting Started, each containing sub‑topics for clean CMS organization."
]

async function run() {

    // Connect to your Atlas cluster
    const uri = process.env.VECTOR_EMBEDDING
    if (!uri) {
      throw new Error('VECTOR_EMBEDDING env var is not set')
    }

    const client = new MongoClient(uri)

    try {
        await client.connect();
        const db = client.db("knowledge-base");
        const collection = db.collection<{
          text: string
          embedding: number[]
        }>("embeddings");

        console.log("Generating embeddings and inserting documents...");
        const insertDocuments: Array<{ text: string; embedding: number[] }> = [];
        await Promise.all(texts.map(async text => {
            // Check if the document already exists
            const existingDoc = await collection.findOne({ text });

            // Generate an embedding using the function that you defined
            const embedding = await getEmbedding(text);
            
            // Uncomment the following lines to convert the generated embedding into BSON format
            // const bsonEmbedding = await convertEmbeddingsToBSON([embedding]); // Since convertEmbeddingsToBSON is designed to handle arrays
            // embedding = bsonEmbedding; // Use BSON embedding instead of the original float32 embedding
                      
            // Add the document with the embedding to array of documents for bulk insert
            if (!existingDoc) {
                insertDocuments.push({
                    text,
                    embedding
                })
            }
        }));

        // Continue processing documents if an error occurs during an operation
        const options = { ordered: false };

        // Insert documents with embeddings into Atlas
        const result = await collection.insertMany(insertDocuments, options);  
        console.log("Count of documents inserted: " + result.insertedCount); 

    } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.stack ?? err.message)
        } else {
          console.error('Unknown error in embed-kb:', err)
        }
    } finally {
        await client.close();
    }
}
run().catch(console.dir);