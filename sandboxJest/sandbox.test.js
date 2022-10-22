const sum = require('./sandbox'); 

let count = 1


beforeEach(() => {
    count = 1
})
describe('tests numbers', () => {
    beforeEach(() => {
        count = 1
    })

    test('should return the sum of a and b', () => {
        count = 2
        expect(sum(2, 2)).toBe(4); 
    })
    
    test('should return a message that says invalid numbers', () => {
        expect(1).toBe(count); 
    })
})

describe('checks objects', () => {
    test('should match object with passed in object', () => {
        const data = { firstName: 'tony' }; 
        data['lastName'] = 'kim'; 
    
        expect(data).toEqual({firstName: 'tony', lastName: 'kim' }); 
    })
    
    test('should test if a value is null', () => {
        const thisIsNull = null; 
    
        expect(thisIsNull).toBeNull(); 
        expect(thisIsNull).not.toBeTruthy(); 
    })
    
    test('should return a sum greater than 2', () => {
        expect(sum(2, 2)).toBeGreaterThan(2) 
    })
    
    test('should expect string to contain the word stop', () => {
        expect('stackoverflowy').toMatch(/over/)
    })
    
    test('should include the word cowboys in array', () => {
        const nflList = [
            'broncos', 
            'cheifs', 
            'cowboys', 
            'eagles'
        ]
    
        expect(nflList).toContain('cowboys'); 
    })
    
    const shouldErrorOut = () => {
        throw new Error('you did something wrong')
    }
    
    test('should throw an error when invoked', () => {
        expect(() => shouldErrorOut()).toThrow(Error); 
        expect(() => shouldErrorOut()).toThrow('you did something wrong'); 
    })
    
    test('should resolve to a value that says go broncos!', () => {
        return expect(Promise.resolve('go broncos!')).resolves.toBe('go broncos!')
    })
    
    test('should resolve to a value that says go mavs!', async () => {
        await expect(Promise.resolve('go mavs!')).resolves.toBe('go mavs!')
    })
    
    test('should reject to a error value', async () => {
        await expect(Promise.reject(new Error('cowboys'))).rejects.toThrow('cowboys')
    })
})

// test('should return data from the fetch function', () => {
//     return fetchData().then(data => {
//         expect(data).toEqual({ 'firstName': 'Tony', 'lastName': 'kim' })
//     })
// })

test('should return undefined by default', () => {
    const mock = jest.fn()

    const result = mock('booo cowboys'); 

    expect(mock).toHaveBeenCalledWith('booo cowboys')
})

const { MongoClient } = require('mongodb'); 

describe('insert transaction', () => {
    let connection; 
    let db; 

    //set up and kick up our database connection
    beforeAll(async () => {
        connection = await MongoClient.connect(mongoURL, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })

        db = await connection.db(process.env.DATABASE_NAME)
    })

    //tear down by closing off the database server
    afterAll(async () => {
        await connection.close(); 
    })

    it('should insert a doc into collection', async () => {
        // retrieve the collection we want to add the new insert into 
        const users = db.collection('users'); 

        // create a fake data to insert into the db. 
        const mockUser = { _id: 'some-id', name: 'john' }; 

        // inserting the new user into the db more specifically the user collection
        await users.insertOne(mockUser); 

        // check to ensure that the user we added is in the database
        const insertedUser = await users.findOne({ _id: 'some-id' }); 

        // check to insure that the intedned inserted user matches with what is in the DB. 
        expect(insertedUser).toEqual(mockUser); 
    })
})