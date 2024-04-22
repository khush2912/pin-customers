export interface Pin {
  id?: number,
  title: string,
  email: string,
  collaboratorIds: number[],
  file: string,
  privacy: string;
  collaborators: Collaborators[];
}

export interface Collaborators {
  id: number;
  title: string;
}
