import Layout from '../components/layout'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home(props) {
    // Here the `fetcher` function will be executed on the client-side.
    const { data } = useSWR('/api/user/all', fetcher, { refreshInterval: 500 })

    const generateUser = () => {
        fetch('/api/user/generate', {
            method: 'POST'
        })
            .then((res) => res.json())
            .then((result) => console.log(`'success': ${result}`))
            .catch((err) => console.log(`'error': ${err}`))
    }

    const editUser = (id) => {
        return function () {
            fetch(`/api/user/edit/${id}`, {
                method: 'POST'
            })
                .then((res) => res.json())
                .then((result) => console.log(`'success': ${result}`))
                .catch((err) => console.log(`'error': ${err}`))
        }
    }

    const deleteUser = (id) => {
        return function () {
            fetch(`/api/user/delete/${id}`, {
                method: 'POST'
            })
                .then((res) => res.json())
                .then((result) => console.log(`'success': ${result}`))
                .catch((err) => console.log(`'error': ${err}`))
        }
    }



    if (!data) return <div>loading...</div>

    const userTableList = data.allUsers.map((user) => {
        return (<tr key={user.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {user.id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {user.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.birthday}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.createdAt}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.updatedAt}
            </td>
            <td className="px-6 py-4  whitespace-nowrap text-right text-sm font-medium">
                <a onClick={editUser(user.id)} className="cursor-pointer text-indigo-600 hover:text-indigo-900">Edit</a>
            </td>
            <td className="px-6 py-4  whitespace-nowrap text-right text-sm font-medium">
                <a onClick={deleteUser(user.id)} className="cursor-pointer text-red-600 hover:text-red-900">Delete</a>
            </td>
        </tr>)
    }

    );
    return (
        <Layout>
            <div className="mt-8">
                <div className="max-w-7xl mx-auto px-4  lg:px-8">
                    <div className="max-w-3xl mx-auto px-4  md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl">
                        <h1 className="text-2xl font-bold text-gray-900">Users ({data.allUsers.length})</h1>
                        <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                            <button onClick={generateUser} type="button" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
                                Generate User
            </button>
                        </div>
                    </div>
                    <div className="mt-8 flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Id
                  </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Name
                  </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Email
                  </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Birthday
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Created At
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Updated At
                  </th>
                                                <th scope="col" className="relative px-6 py-3">
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                                <th scope="col" className="relative px-6 py-3">
                                                    <span className="sr-only">Delete</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {userTableList}

                                            {/* More items... */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

// export async function getStaticProps() {
//     // `getStaticProps` is invoked on the server-side,
//     // so this `fetcher` function will be executed on the server-side.
//     const response = await fetcher('http://localhost:3000/api/user/all')
//     return { props: { users: response } }
// }