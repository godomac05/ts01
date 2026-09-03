export interface IncomingWhatsAppMessage {
  from: string;
  id: string;
  timestamp: string;
  type: "text" | "image";
  text?: string;
  image?: {
    mediaId: string;
    mimeType: string;
    caption?: string;
  };
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
