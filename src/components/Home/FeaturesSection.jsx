import { Typography } from "@material-tailwind/react"
import feature from "../../assets/todo2.svg"
import Container from "../Containar/Container"

const FeaturesSection = () => {
  return (
    <>
    <Container>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-center my-8">
    <div className="">
        <Typography variant="h3" >Features</Typography>
        <Typography variant="lead"> Manage Your Task Like Pro</Typography>
        <Typography variant="paragraph"># Add your task </Typography>
        <Typography variant="paragraph"># Staging your task </Typography>
        <Typography variant="paragraph"># Remove your task </Typography>
    </div>
    <div>
        <img src={feature} alt="feature" />
    </div>
    </div>
    </Container>

    </>
  )
}

export default FeaturesSection