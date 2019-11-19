import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreateVideoDto {
  @ApiModelProperty({description: 'Youtube link of the video',
    example: 'https://www.youtube.com/watch?v=hTWKbfoikeg',
    pattern: 'http(?:s?):\\/\\/(?:www\\.)?youtu(?:be\\.com\\/watch\\?v=|\\.be\\/)([\\w\\-\\_]*)(&(amp;)?‌​[\\w\\?‌​=]*)?'
  })
  @IsString()
  @IsNotEmpty()
  @Matches(new RegExp('http(?:s?):\\/\\/(?:www\\.)?youtu(?:be\\.com\\/watch\\?v=|\\.be\\/)([\\w\\-\\_]*)(&(amp;)?‌​[\\w\\?‌​=]*)?'))
  link: string;

  @ApiModelPropertyOptional({description: 'Timestamp of the video', example: 70})
  @IsOptional()
  @IsNumber()
  timestamp?: number;

  @ApiModelProperty({description: 'Set to false as default, indicate that the video has not been seen yet', example: false})
  @IsBoolean()
  @IsNotEmpty()
  seen: boolean;

  @ApiModelProperty({description: 'Name of the room where the video has been created', example: 'Chill'})
  @IsString()
  @IsNotEmpty()
  room: string;
}
