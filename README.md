Node Graphql demo

server.js query
```
query {
  message
}
```

server2.js

```
query getSingleCourse($courseID: Int!) {
  course(id: $courseID) {
      title
      author
  }
}

query varibales
{
  "courseID": 1
}
```

Using Aliases & Fragments
```
query getCourseWithFragments($courseID1: Int!, $courseID2: Int!) {
      course1: course(id: $courseID1) {
             ...courseFields
      },
      course2: course(id: $courseID2) {
            ...courseFields
      } 
}
fragment courseFields on Course {
  title
  author
}

query varibales
{ 
    "courseID1":1,
    "courseID2":2
}
```

Mutation
```
mutation updateCourseTopic($id: Int!, $topic: String!) {
  updateCourseTopic(id: $id, topic: $topic) {
    ... courseFields
  }
}

fragment courseFields on Course {
  title
  author
  topic
}

query varibales
{
  "id": 1,
  "topic": "hh"
}
```
