import { Category } from "src/category/entities/category.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn({name:'transaction_id'})
    // @Generated("increment")
    id:number

    @Column()
    title:string

    @Column()
    amount:number

    @Column({nullable:true})
    type: string

    @ManyToOne(() => User,(user) => user.transactions)
    @JoinColumn({name:'user_id'})
    user:User
    
    @ManyToOne(() => Category,(category) => category.transactions)
    @JoinColumn({name:'category_id'})
    category: Category

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt:Date
}
