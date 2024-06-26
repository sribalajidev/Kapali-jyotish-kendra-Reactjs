import './Testimonial.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import testiImgOne from '../../assets/images/testi-img-one.jpg';
import testiImgTwo from '../../assets/images/testi-img-two.jpg';
import { gql, useQuery } from '@apollo/client';
import Slider from 'react-slick';

const GET_POSTS = gql`
  query MyQuery {
    testimonials {
      id
      clientName
      description {
        html
      }
    }
  }
`;

function TestimonialItem({ clientName, description }) {
  return (
    <div className='testimonial-item'>
      <p dangerouslySetInnerHTML={{ __html: description.html }}></p>
      <h3 className='customer-name'>{clientName}</h3>
    </div>
  );
}

function Testimonial() {
  // Settings for React Slick carousel
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    fade: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className='testimonial-wrapper'>
      <div className='container'>
        <div className='section-header'>
          <h3>What People Say About Us</h3>
          <p>Don't take our word for it. See what customers are saying about us.</p>
        </div>
        <div className='testimonial-column'>
          <div className='testi-img-wrapper'>
            <div className='two-column'>
              <div className='testi-img-left'>
                <img src={testiImgOne} className='testi-img' alt='testimonial of kapali jyotish kendra' />
              </div>
              <div className='testi-img-right'>
                <div className='card'>
                  <h3>1000+</h3>
                  <p>Satisfied Customers</p>
                </div>
                <div className='testi-img'>
                  <img src={testiImgTwo} className='testi-img' alt='testimonial of kapali jyotish kendra' />
                </div>
              </div>
            </div>
          </div>
          <div className='testi-item-carousel'>
            <Slider {...settings}>
              {data.testimonials.map((testiItem) => (
                <TestimonialItem
                  key={testiItem.id}
                  clientName={testiItem.clientName}
                  description={testiItem.description}
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
