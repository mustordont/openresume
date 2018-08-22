export interface IHerokuMax {
  max: number;
  total: number;
}

export interface IStats {
  users: {
    [key: string]: number;
  },
  resume: {
    [key: string]: number;
    total: number;
  },
  db: {
    memory: IHerokuMax;
    rows: IHerokuMax;
  }
}