const Footer = () => 
    {
        return (<footer className="bg-[#1a1f29]/90 border-t border-[#2b3240]/50 text-gray-400 
                         text-center py-8 mt-auto relative z-10 backdrop-blur-md ">
        
        <p>
          &copy; {new Date().getFullYear()} Bokhar Store —{" "}
         <a
           href="https://www.linkedin.com/in/roham-h-fasih/"
           target="_blank"
           rel="noopener noreferrer"
           className="text-sky-400 font-semibold hover:underline hover:text-sky-300 transition-colors duration-300">
           Created by Roham Harandifasih
        </a>
        </p>
      

        </footer>);
    }
    export default Footer;