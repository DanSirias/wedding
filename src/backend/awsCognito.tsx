export interface AwsAuthConfig {
    region: string;
    userPoolId: string;
    userPoolWebClientId: string;
}

export interface AwsConfig {
    Auth: AwsAuthConfig;
}

export const awsConfig: AwsConfig = {
    Auth: {
        region: 'us-east-1', // e.g., us-east-1
        userPoolId: 'us-east-1_I508zb7Gd', // e.g., us-east-1_XxxxxxxxX
        userPoolWebClientId: '5bfvpm9fvjgbh5c2s32oiv9d6h', // e.g., xxxxxxxxXxxxxxxxxxXxxxxxx
    }
};
