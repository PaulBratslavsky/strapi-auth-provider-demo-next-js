export interface StrapiUserData {
  id: number;
  documentId: string;
  username: string;
  email: string;
}

export interface StrapiUserMeProps {
  user: StrapiUserData | null;
} 