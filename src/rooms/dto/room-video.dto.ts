import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class RoomVideoDto {
  @ApiModelProperty({description: 'Link of the video',
    example: 'https://youtu.be/hTWKbfoikeg',
    pattern: 'http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?'
  })
  @IsString()
  @IsNotEmpty()
  @Matches(new RegExp('http(?:s?):\\/\\/(?:www\\.)?youtu(?:be\\.com\\/watch\\?v=|\\.be\\/)([\\w\\-\\_]*)(&(amp;)?‌​[\\w\\?‌​=]*)?'))
  link: string;

  @ApiModelPropertyOptional({description: 'Timestamp of the video', example: 70})
  @IsOptional()
  @IsNumber()
  timestamp?: number;

  @ApiModelProperty({description: 'Set to true if the video has already been seen', example: false})
  @IsBoolean()
  @IsNotEmpty()
  seen: boolean;
}
