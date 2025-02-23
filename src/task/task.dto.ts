import { IsDateString, IsEnum, IsOptional, IsString, IsUUID, MaxLength, MinLength, Validate } from "class-validator";



export  enum TaskStatusEnum {
  PENDING = "PENDENTE",
  DONE = "CONClUIDA"
}
export class TaskDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsUUID()
  userId: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  title: string;

  @IsString()
  @MinLength(5)
  @MaxLength(510)
  description: string;

  @IsEnum(TaskStatusEnum)
  @IsOptional()
  status: string;

  @IsDateString()
  expirationDate: Date;
}

export interface FindAllParameters {
  title: string;
  status: string;
}


