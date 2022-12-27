export interface Replay {
  id?: string;
  dateCreated?: string;
  description?: string;
  gameInfo?: string;
  name?: string;
  active? : boolean;
  status?: string;
  thumbnail?: string;
  title?: string;
  url?: string;
  rawUrl?: string;
  userVote?: {
      voted: boolean;
      overturn: boolean;
    }
  votes?: {
      confirm: number;
      overturn: number;
     }
}
