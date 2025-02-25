import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum TaskStatusEnum {
  PENDING = 'PENDENTE',
  DONE = 'CONCLUIDA',
}
export class TaskDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsUUID()
  @ApiProperty()
  userId: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty()
  title: string;

  @IsString()
  @MinLength(5)
  @MaxLength(510)
  @ApiProperty()
  description: string;

  @IsEnum(TaskStatusEnum)
  @IsOptional()
  @ApiProperty()
  status: TaskStatusEnum;

  @IsDateString()
  @ApiProperty()
  expirationDate: Date;
}

export class TaskUpdateDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @ApiPropertyOptional()
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(510)
  @ApiPropertyOptional()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatusEnum)
  @ApiPropertyOptional()
  status?: TaskStatusEnum;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional()
  expirationDate?: Date;
}

export class FindAllParameters {
  @ApiPropertyOptional()
  title?: string;
  @ApiPropertyOptional()
  status?: string;
}

export class TaskRouteParams {
  @IsUUID()
  @ApiProperty()
  id: string;
}
