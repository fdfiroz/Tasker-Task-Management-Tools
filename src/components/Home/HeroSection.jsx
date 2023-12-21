import { Carousel, Typography, Button } from "@material-tailwind/react";
import Container from "../Containar/Container"
import cover1 from "../../assets/cover-1.jpg"
import cover2 from "../../assets/cover-2.jpg"
import cover3 from "../../assets/cover-3.jpg"
const HeroSection = () => {
  return (
    <Container>
        <Carousel loop={true} autoplay={true} autoplayDelay={3000} className="rounded-xl h-screen">
      <div className="relative h-full w-full">
        <img
          src={cover1}
          alt="image 1"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              The Beauty of Nature
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              It is not so much for its beauty that the forest makes a claim
              upon men&apos;s hearts, as for that subtle something, that quality
              of air that emanation from old trees, that so wonderfully changes
              and renews a weary spirit.
            </Typography>
            <div className="flex justify-center gap-2">
              <Button size="lg" color="white">
              Let’s Explore
              </Button>
              {/* <Button size="lg" color="white" variant="text">
                Gallery
              </Button> */}
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src={cover2}
          alt="image 2"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
          <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              The Beauty of Nature
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              It is not so much for its beauty that the forest makes a claim
              upon men&apos;s hearts, as for that subtle something, that quality
              of air that emanation from old trees, that so wonderfully changes
              and renews a weary spirit.
            </Typography>
            <div className="flex gap-2">
              <Button size="lg" color="white">
              Let’s Explore
              </Button>
              {/* <Button size="lg" color="white" variant="text">
                Gallery
              </Button> */}
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src={cover3}
          alt="image 3"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 grid h-full w-full items-end bg-black/75">
          <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              The Beauty of Nature
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              It is not so much for its beauty that the forest makes a claim
              upon men&apos;s hearts, as for that subtle something, that quality
              of air that emanation from old trees, that so wonderfully changes
              and renews a weary spirit.
            </Typography>
            <div className="flex gap-2">
              <Button size="lg" color="white">
              Let’s Explore
              </Button>
              {/* <Button size="lg" color="white" variant="text">
                Gallery
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </Carousel>
    </Container>
  )
}

export default HeroSection