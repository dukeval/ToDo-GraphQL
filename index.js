const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

let todos =[
    {id:1, description:'Finish ToDo using GraphQL', owner: 'Jude Valerius', completed: false, active: true}
];

const typeDefs = `
    type Query{
        info: String!
        allToDos: [ToDo!]!
    }

    type Mutation{
        createToDo(description: String!, owner: String!,  completed: Boolean!, active: Boolean!): ToDo!
        updateToDo(id: Int!, description: String!, owner: String!, completed: Boolean!, active: Boolean!): ToDo!
        deleteToDo(id: Int!): ToDo!
    }

    type ToDo{
        id: Int!
        description: String! 
        owner: String! 
        completed: Boolean!
        active: Boolean!
    }
`;

const resolvers ={
    Query:{
        info: ()=> `Welcome to your ToDo App`,
        allToDos: async(parent, args,context)=>{            
            return context.prisma.toDo.findMany();
            //return todos;
        }
    },
    Mutation:{
        createToDo: async(parent, args,context)=>{            
            const {description, owner, completed,active} = args;
            const newToDo = context.prisma.toDo.create({
				data: {
					description,
                    owner,
                    completed,
                    active,
				},
            });
            
            //const newToDo = {id: todos.length +1, description,owner, completed,active};
            //todos.push(newToDo);

            return newToDo;
        },
        updateToDo: async(parent, args,context)=>{
            const {id, description,owner,completed, active} = args;
            
            const saveToDo = context.prisma.toDo.update({
				where: {
					id: parseInt(id),
				},
				data: {
                    description,
                    owner,
                    completed,
                    active
				},
			});

            // const saveToDo = todos[id-1];
            // saveToDo.description = description;
            // saveToDo.owner = owner;
            // saveToDo.completed =completed;
            // saveToDo.active = active
            
            return saveToDo;
        },
        //set just flag active to false for deleted todo's
        deleteToDo: async(parent,args,context)=>{
            const {id} = args;
            const deleteToDo = context.prisma.toDo.delete({
                where:{
                    id: parseInt(id),
                },
            });

            return deleteToDo;
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
	context: ({ req }) => {
		return {
			...req,
			prisma,
        };
    }
});


server.listen().then(({url,}) =>{
    console.log(`GraphQl server is listening on ${url}`);
    
} )