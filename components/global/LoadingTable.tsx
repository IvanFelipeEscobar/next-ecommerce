import { Skeleton } from "../ui/skeleton"

const LoadingTable = ({rows = 5} : {rows?: number}) => {
    const tableRows = Array.from({length: rows}, (_, i) => <div key={i} className="mb-4"><Skeleton className="w-full h-8 rounded"/></div>)
  return <>{tableRows}</>
}
export default LoadingTable