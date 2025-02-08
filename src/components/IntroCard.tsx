
type IntroCardProps = {
    image: string;
    name: string;
    price: string | number;
};


const IntroCard = ({ image, name, price }: IntroCardProps) => {
    return (
        <div className='w-[60%] h-auto aspect-[6/8] bg-violet-500  rounded-3xl relative mx-auto'>
            <div className='w-full h-full bg-violet-100 rounded-3xl absolute bottom-2 right-2 shadow-md flex flex-col '>
                <img alt="card" src={image} className='w-3/5 aspect-square m-auto ' />
                <div className='p-4'>
                    <p className='text-xl md:text-3xl font-semibold'>{name}</p>
                    <p className='mt-2'>${price}</p>
                </div>
            </div>
        </div>
    )
}

export default IntroCard 