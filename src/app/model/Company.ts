export class Company {
    user: {
            email:string;
            password: string;
            confirmPassword: string;
            securityQuestion1: string;
            securityQuestion2: string;
            securityQuestion3: string;
            securityAnswer1: string;
            securityAnswer2: string;
            securityAnswer3: string;
    };
    company: {
            name: string;
            addressLine1: string;
            addressLine2: string;
            country: string;
            city: string;
            state: string;
            zipCode: string;
            phone: string;
            eIN: string;
            description: string;
            website: string;
    
    };

    employee: {
            firstName: string;
            lastName: string;
            sSN : string;
            addressLine1: string;
            addressLine2: string;
            country: string;
            city: string;
            state: string;
            zipCode: string;
            companyId: string;
            picture: string;
            position: string;
            phone:string;

    }
    
}