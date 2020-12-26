declare module 'mongoose-mongodb-errors' {
    function ProcessMongoDBErrors(schema: import('mongoose').Schema): void;

    export = ProcessMongoDBErrors;
}
