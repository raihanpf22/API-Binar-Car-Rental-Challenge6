import {
  Table,
  Model,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "Cars",
})
export class Car extends Model {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  no_police!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  brand!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  model!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price_perday!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  capacity!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  status!: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  transmision!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  createdBy!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  updatedBy!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
