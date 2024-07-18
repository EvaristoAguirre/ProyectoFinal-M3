import styles from './Home.module.css';

function Home (){
 return (
   <div className={styles.container}>

      <div className={styles.container1}>

         <h1>Disfrutá la magia y el sabor de Mendoza</h1>

         <h2> ¿Buscas una experiencia culinaria única en el corazón de Mendoza? </h2> 

         <p>
         Sabores de Montaña te invita a descubrir un refugio gastronómico donde el sabor y la tradición se unen en un entorno montañoso de ensueño.
         </p>
         <p>
         Ubicado en Uspallata, nuestro restaurante ofrece un oasis de paz y tranquilidad a solo pasos de la vibrante ciudad. Disfruta de una vista espectacular de los viñedos y las montañas mientras te deleitas con platos artesanales elaborados con ingredientes frescos y de temporada.
         </p>
         <p>
         En Sabores de Montaña, la pasión por la cocina se refleja en cada plato. Nuestro chef, Pedro Pascal, ha creado un menú que combina lo mejor de la cocina argentina con toques innovadores, utilizando técnicas tradicionales y productos locales de la más alta calidad.
         </p>
      </div>
   </div>
      
 )
}

export default Home;