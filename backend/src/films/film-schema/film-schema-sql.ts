import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Schedule } from '../../order/order-schema/order-schema-sql';

@Entity('films')
export class Film {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'float' })
    rating: number;

    @Column()
    director: string;

    @Column('text', { array: true })
    tags: string[];

    @Column()
    image: string;

    @Column()
    cover: string;

    @Column()
    title: string;

    @Column('text')
    about: string;

    @Column('text')
    description: string;

    @OneToMany(() => Schedule, schedule => schedule.film)
    schedules: Schedule[];

    constructor(film: Partial<Film>) {
        Object.assign(this, film)
    }
}