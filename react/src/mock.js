import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

let axiosInstance = axios.create({
    timeout: 1000
});

let mock = new MockAdapter(axiosInstance);

mock.onGet('/users').reply(200, {
    users: [
        { id: 1, name: 'John Smith' }
    ]
});

mock.onPost("/users").reply((config) => {
    const { firstName, lastName } = JSON.parse(config.data);
    console.log(config?.data)
    console.log(config?.headers)
    if (firstName && lastName) {
        return [200, {
            id: "12345",
            firstName: "Fred",
            lastName: "Flintstone",
        }]
    }

    return [200, { message: "Looks like you didn't provide the required data." }];
});

export default axiosInstance