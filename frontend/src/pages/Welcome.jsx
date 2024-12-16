import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import imageSrc from "../assets/image.png";
import Layout from "../components/Layout";

function Welcome() {
  return (
    <Layout>
      <div className="h-screen flex flex-col">
        <div className="max-w-96 mx-auto my-auto">
          <div className="mx-auto pt-10">
            <img src={imageSrc} alt="Wellcome Page" />
          </div>

          <div className="mt-10">
            <p className="text-4xl">
              <span className="text-green-200 mr-2">Better </span>
              Task Management
            </p>
            <p className="mt-4 text-gray-300 text-opacity-100">
              "Organize your day, one task at a time!"
            </p>
          </div>

          <div className="mt-5">
            <Link
              to="/tasks"
              className="w-fit flex flex-row-reverse gap-2 rounded-full bg-yellow-200 text-black"
            >
              <span className="my-auto inline-block pl-3 pr-5">
                Get Started
              </span>
              <div className="p-4 rounded-full m-1 text-white bg-black flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Welcome;
