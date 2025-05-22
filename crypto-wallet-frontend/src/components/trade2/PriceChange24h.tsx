
import { IoArrowDown, IoArrowUp } from 'react-icons/io5'

type Props = {
  changePrice: number
}

function PriceChange24h({ changePrice }: Props) {
  return (
    <div
      className={
        'flex ' + (changePrice > 0 ? 'text-green-500' : 'text-red-500')
      }
    >
      <div className="ml-2 my-auto ">
        {changePrice > 0 ? <IoArrowUp /> : <IoArrowDown />}
      </div>
      <div>{changePrice.toFixed(5)}%</div>
    </div>
  )
}

export default PriceChange24h
