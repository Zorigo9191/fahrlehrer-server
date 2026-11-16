import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateOfficeInstructorAccountDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(72)
  password: string;

  @IsString()
  @Matches(/^\+?[0-9\s\-/]{6,20}$/, { message: 'Ungültige Telefonnummer' })
  phone_number: string;
  // ^ start und $ ist Ende
  // 0-9: Alle Ziffern von 0 bis 9.
  // \s: Leerzeichen.
  // -: Ein Bindestrich.
  // /: Ein Schrägstrich.
  // {6,20}:mindestens 6 und höchstens 20 Zeichen

  @IsArray()
  @ArrayNotEmpty()
  @IsIn(['AM', 'A1', 'A2', 'A', 'B197', 'B78', 'B', 'BE'], {
    each: true,
    message: 'Bitte richtige Führerscheinklasse wählen',
  })
  teaching_classes: string[];
}
