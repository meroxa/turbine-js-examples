import Layout from '../components/layout'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home() {
    // Here the `fetcher` function will be executed on the client-side.
    const { data } = useSWR('/api/audit-logs', fetcher, { refreshInterval: 500 })

    const generateuser = () => {
        fetch('/api/generate', {
            method: 'POST'
        })
            .then((res) => res.json())
            .then((result) => console.log(`'success': ${result}`))
            .catch((err) => console.log(`'error': ${err}`))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        generateuser()
    }

    console.log(data)

    if (!data) return <div>loading...</div>

    const auditdata = data.data

    const userTableList = auditdata.map((log) => {

        return (<tr key={log._id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-900">
                {(() => {
                    switch (log.type) {
                        case "create": return (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                                {log.type}
                            </span>
                        )
                        case "delete": return (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 capitalize">
                                {log.type}
                            </span>
                        )
                        case "update": return (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 capitalize">
                                {log.type}
                            </span>
                        )
                        default: return (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                                {log.type}
                            </span>
                        )
                    }
                })()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {log.userId}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="/" className="text-indigo-600 hover:text-indigo-900">Edit</a>
            </td>
        </tr>)
    }



    );
    console.log(userTableList);
    return (
        <Layout>
            <div className="mt-8">
                <div className="max-w-3xl mx-auto px-4  lg:px-8">
                    <div className="max-w-3xl mx-auto px-4  md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl">
                        <h1 className="text-2xl font-bold text-gray-900">Audit Logs ({data.data.length})</h1>
                        <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                            <button onClick={handleSubmit} type="button" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
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
                                                    Change
                  </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    User Id
                  </th>

                                                <th scope="col" className="relative px-6 py-3">
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {userTableList.reverse()}

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