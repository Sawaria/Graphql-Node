const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// GraphQL schema
const schema = buildSchema(`
  type Query {
    course(id: Int!): Course
    courses(topic: String): [Course]
  },
  type Course {
    id: Int
    title: String
    author: String
  }
`);

const coursesData = [
  {
    id: 1,
    title: 'course 1',
    author: 'Piyush'
  },
  {
    id: 2,
    title: 'course 2',
    author: 'Sawaria'
  }
];

const getCourse = (args) => { 
  const id = args.id;
  return coursesData.filter(course => {
      return course.id == id;
  })[0];
}

const getCourses = (args) => {
  if (args.topic) {
      const topic = args.topic;
      return coursesData.filter(course => course.topic === topic);
  } else {
      return coursesData;
  }
}

// Root resolver
const root = {
  course: getCourse,
  courses: getCourses
};

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));

// reference - https://medium.com/codingthesmartway-com-blog/creating-a-graphql-server-with-node-js-and-express-f6dddc5320e1

// query getSingleCourse($courseID: Int!) {
//   course(id: $courseID) {
//       title
//       author
//   }
// }

// query varibales
// {
//   "courseID": 1
// }