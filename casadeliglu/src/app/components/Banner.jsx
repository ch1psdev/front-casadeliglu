import 'animate.css'
import { ArrowIcon } from '../../assets/Icons'

export const Banner = () => {

    const imgsBanner = [
        {
            id:1,
            url:'https://m.media-amazon.com/images/I/517MRPeJfKL._AC_UF894,1000_QL80_.jpg',
            alt:''
        },
        {
            id:2,
            url:'https://previews.123rf.com/images/almoond/almoond1208/almoond120800060/14897448-banner-hecho-de-ilustración-colorida-verduras-frescas.jpg',
            alt:''
        }
    ]

    // const handleChangeBanner = (e) => {
    //     if(e.target.checked == true){
    //         document.querySelector("label[name='"+e.target.id+"']").classList.add('banner__radio__chk');
    //         console.log(e.target.checked)
    //     }else{
    //         document.querySelector("label[name='"+e.target.id+"']").classList.remove('banner__radio__chk');
    //         console.log(e.target.checked)
    //     }
    // }

  return (
    <>
        <div className="container-fluid" style={{height:'516px',display: 'grid', padding:'0'}}>
            <div style={{position:'absolute', alignSelf:'center', justifySelf:'start'}}>
                <button><ArrowIcon/></button>
            </div>
            <div style={{position:'absolute', alignSelf:'center', justifySelf:'end'}}>
                <button>Right</button>
            </div>
            <div style={{position:'absolute', placeSelf: 'end center', width:'100%', display:'flex', justifyContent:'center', padding:'15px', gap:'10px'}}>

                {
                    imgsBanner.map((data, i) => (
                        <div key={i}>
                            <input type="radio" name='btnBanner' id={`banner${i}`} hidden/>
                            <label htmlFor={`banner${i}`} className='banner__radio' name={`banner${i}`}></label>
                        </div>
                    ))
                }
                {/* <div>
                    <input type="radio" name='btnBanner' id='banner1' hidden />
                    <label htmlFor="banner1" style={{cursor:'pointer', background:'var(--primary-color)', height:'25px', width:'25px', borderRadius:'15px'}}></label>
                </div>
                <div>
                    <input type="radio" name='btnBanner' id='banner2' hidden />
                    <label htmlFor="banner2" style={{cursor:'pointer', background:'#fff', height:'25px', width:'25px', borderRadius:'15px'}}></label>
                </div>
                <div>
                    <input type="radio" name='btnBanner' id='banner3' hidden />
                    <label htmlFor="banner3" style={{cursor:'pointer', background:'#fff', height:'25px', width:'25px', borderRadius:'15px'}}></label>
                </div>
                <div>
                    <input type="radio" name='btnBanner' id='banner4' hidden />
                    <label htmlFor="banner4" style={{cursor:'pointer', background:'#fff', height:'25px', width:'25px', borderRadius:'15px'}}></label>
                </div> */}
            </div>
            <div>
                <img src="https://m.media-amazon.com/images/I/517MRPeJfKL._AC_UF894,1000_QL80_.jpg" alt="" style={{width:'100%', height:'516px'}} />
            </div>

        </div>
    </>
  )
}
