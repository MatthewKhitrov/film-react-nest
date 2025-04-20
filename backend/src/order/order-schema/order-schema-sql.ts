import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Film } from '../../films/film-schema/film-schema-sql';

@Entity('schedules')
export class Schedule {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    filmId: string;

    @Column()
    daytime: Date;

    @Column()
    hall: number;

    @Column()
    price: number;

    @Column()
    rows: number;

    @Column()
    seats: number;

    @Column('text', { nullable: true })
    taken: string;

    @ManyToOne(() => Film, film => film.schedules)
    film: Film;
  schedule: any;

    constructor(schedule: Partial<Schedule>) {
        Object.assign(this, schedule)
    }
}
