import {IStats} from '../../service/interfaces';

export interface StatsGroupItem {
  label: string;
  count: number;
}

export interface StatsGroup {
  label: string;
  items: StatsGroupItem[];
}

export class StatsModel {
  public readonly memoryUsage: number = 0;
  public readonly rowsUsage: number = 0;
  public readonly groups: StatsGroup[] = [];
  constructor(data?: IStats) {
    if (!data) return;
    this.memoryUsage = data.db.memory.total/ data.db.memory.max * 100;
    this.rowsUsage = data.db.rows.total/ data.db.rows.max * 100;
    this.groups.push({
      label: 'resume',
      items: [
        {
          label: 'headhunter',
          count: data.resume.headhunter,
        },
        {
          label: 'superjob',
          count: data.resume.superjob,
        },
      ]
    });
    this.groups.push({
      label: 'users',
      items: [
        {
          label: 'headhunter',
          count: data.users.headhunter,
        },
        {
          label: 'superjob',
          count: data.users.superjob,
        },
      ]
    });
  }

}
