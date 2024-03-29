const { MongoClient, ObjectId } = require('mongodb');
const Employee = require('../src/Employee');

const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

async function run() {
  await client.connect();
  return 'Connected to the MongoDB server...';
}

run()
  .then(console.log)
  .catch(console.error);

  const repo = {
    findAll: async () => {
      let employees = [];
      const employeeColl = client.db('final').collection('employees');
      const cursor = employeeColl.find({});
      await cursor.forEach(row => {
        console.log(row)
        const employee = new Employee(row._id.toString(), row.idNum, row.firstName, row.lastName, row.department, row.notes);
        employees.push(employee);
      });
      return employees;
    },

    findByID: async (uuid) => {
        const employeeColl = client.db('final').collection('employees');
        const filter = {
          '_id': new ObjectId(uuid)
        };
        const row = await employeeColl.findOne(filter);
        console.log(row);
        return new Employee(row._id.toString(), row.idNum, row.firstName, row.lastName, row.department, row.notes);
    },

    create: async (employee) => {
        const row = {idNum: employee.idNum, firstName: employee.firstName, lastName: employee.lastName, department: employee.department, notes: employee.notes};
        const employeeColl = client.db('final').collection('employees');
        const result = await employeeColl.insertOne(row);
        console.log(`An cemployee was inserted with the _id: ${result.insertedId}`);
    },
    
    deleteByID: async (uuid) => {
        const employeeColl = client.db('final').collection('employees');
        const filter = {
          '_id': new ObjectId(uuid)
        };
        const result = await employeeColl.deleteOne(filter);
        if (result.deletedCount === 1) {
          console.log("Successfully deleted an employee.");
        } else {
          console.log("No employee matched the query. Deleted 0 employee.");
        }
    },

    update: async (employee) => { 
        const employeeColl = client.db('final').collection('employees');
        const filter = {
          '_id': new ObjectId(employee.id)
        };
        const updateDoc = {
          $set: {
            idNum: employee.idNum,
            firstName: employee.firstName,
            lastName: employee.lastName,
            department: employee.department,
            notes: employee.notes,
          }
        };
        const result = await employeeColl.updateOne(filter, updateDoc);
        console.log(`${result.matchedCount} employee matched the filter, updated ${result.modifiedCount} employee(s)`);
      },
    };
    
    module.exports = repo;