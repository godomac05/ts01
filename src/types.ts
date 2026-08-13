export interface IncomingWhatsAppMessage {
  from: string;
  id: string;
  timestamp: string;
  text: string;
}

export interface ConversationTurn {
  role: "user" | "assistant";
  content: string;
}

export interface KnowledgeChunk {
  source: string;
  heading: string;
  content: string;
}
