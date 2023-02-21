const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginLandingPageGraphQLPlayground} = require('apollo-server-core')

const typeDefs = `
    type Query{
        hello: String,
        getPersona(name: String, age: Int): String
        getInt: Int! 
        getFloat: Float
        getString: String
        getBoolean: Boolean
        getID: ID
        getNumbers(numbers: [Int!]!): [Int]
    }
`
//Cuando tiene un signo de admiración significa que no recibe ni retorna datos nulos

const resolvers = {
    Query: {
        hello: () => 'hola mundo',
        getPersona: (_, args) => `Hello, mi nombre es ${args.name} y cumplo ${args.age} años `,
        getInt: ()=> 1,
        getFloat: ()=> 1.1,
        getString: ()=> 'Palabra',
        getBoolean: ()=> true,
        getID: ()=> 1231,
        getNumbers:(_,args)=> args.numbers
    }
}

const useGraphql = async (app)=>{
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        playgroup: true,
        plugins:[
            ApolloServerPluginLandingPageGraphQLPlayground
        ]
    });
    await server.start();
    server.applyMiddleware({app})
}
module.exports =useGraphql