export type Connection = {
  id?: string;
  name: string;
  createdAt?: Date;
};

export type Contact = {
  id?: string;
  name: string;
  phone: string;
  createdAt?: Date;
};

export interface Message {
  id: string;
  text: string;
  scheduledAt: Date;
  status: "agendada" | "enviada";
  contactIds: string[];
}
