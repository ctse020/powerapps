import { StringBuilder, String } from './StringBuilder';

export enum FullNameConventionCode
{
    LastFirst = 0,
    FirstLast = 1,
    LastFirstMiddleInitial = 2,
    FirstMiddleInitialLast = 3,
    LastFirstMiddle = 4,
    FirstMiddleLast = 5,
    LastSpaceFirst = 6,
    LastNoSpaceFirst = 7
}

export class FullNameGenerator {

    // Microsoft.Crm.BusinessEntities.FullNameGenerator
    static GenerateFullName(fullNameConventionCode: FullNameConventionCode, firstName: string, middleName: string, lastName: string): string {
        firstName = FullNameGenerator.ConvertNullToEmptyString(firstName);
        middleName = FullNameGenerator.ConvertNullToEmptyString(middleName);
        lastName = FullNameGenerator.ConvertNullToEmptyString(lastName);
        let text: string = String.Empty;
        if (middleName.length > 0) {
            text = middleName.substring(0, 1);
        }
        let stringBuilder: StringBuilder = new StringBuilder();
        switch (fullNameConventionCode)
        {
            case FullNameConventionCode.LastFirst:
                {
                    if (lastName.length > 0 && firstName.length > 0)
                    {
                        stringBuilder.AppendFormat("{0}, {1}", [
                            lastName, 
                            firstName
                        ]);
                    }
                    else
                    {
                        stringBuilder.AppendFormat("{0} {1}", [
                            lastName, 
                            firstName
                        ]);
                    }
                    break;
                }
            case FullNameConventionCode.FirstLast:
                {
                    stringBuilder.AppendFormat("{0} {1}", [
                        firstName, 
                        lastName
                    ]);
                    break;
                }
            case FullNameConventionCode.LastFirstMiddleInitial:
                {
                    if (lastName.length > 0)
                    {
                        stringBuilder.AppendFormat("{0},", [
                            lastName
                        ]);
                    }
                    if (firstName.length > 0)
                    {
                        stringBuilder.AppendFormat(" {0}", [
                            firstName
                        ]);
                    }
                    if (middleName.length > 0)
                    {
                        stringBuilder.AppendFormat(" {0}.", [
                            text
                        ]);
                    }
                    break;
                }
            case FullNameConventionCode.FirstMiddleInitialLast:
                {
                    stringBuilder.Append(firstName);
                    if (middleName.length > 0)
                    {
                        stringBuilder.AppendFormat(" {0}.", [
                            text
                        ]);
                    }
                    stringBuilder.AppendFormat(" {0}", [
                        lastName
                    ]);
                    break;
                }
            case FullNameConventionCode.LastFirstMiddle:
                {
                    if (lastName.length > 0)
                    {
                        stringBuilder.AppendFormat("{0},", [
                            lastName
                        ]);
                    }
                    if (firstName.length > 0)
                    {
                        stringBuilder.AppendFormat(" {0}", [
                                 firstName
                        ]);
                    }
                    if (middleName.length > 0)
                    {
                        stringBuilder.AppendFormat(" {0}", [
                                 middleName
                        ]);
                    }
                    break;
                }
            case FullNameConventionCode.FirstMiddleLast:
                {
                    stringBuilder.Append(firstName);
                    if (middleName.length > 0)
                    {
                        stringBuilder.AppendFormat(" {0}", [
                                middleName
                        ]);
                    }
                    stringBuilder.AppendFormat(" {0}", [
                         lastName
                    ]);
                    break;
                }
            case FullNameConventionCode.LastSpaceFirst:
                {
                    stringBuilder.AppendFormat("{0} {1}", [
                        lastName, 
                        firstName
                    ]);
                    break;
                }
            case FullNameConventionCode.LastNoSpaceFirst:
                {
                    stringBuilder.AppendFormat("{0}{1}", [
                        lastName, 
                        firstName
                    ]);
                    break;
                }
            default:
                {
                    throw new Error("fullNameConventionCode");
                }
        }
        return stringBuilder.ToString().trim();
    }

    public static ConvertNullToEmptyString(name: string): string {
        if (name == null)
        {
            return String.Empty;
        }
        return name.trim();
    }
}
