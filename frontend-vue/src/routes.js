import Courses from './components/course.vue'
import Reviews from './components/review.vue'
import Register from './components/register.vue'
import Login from './components/login.vue'
import Dashboard from './components/dashboard.vue'
import ReviewForm from './components/reviewform.vue'

const routes = [{path:"/",component:Courses},
                {path:"/review/add/:id",component:ReviewForm},       
                {path:"/review/:id",component:Reviews},
                {path:"/register",component:Register},
                {path:"/login",component:Login},
                {path:"/courses/add",component:Dashboard}
               
];

export default routes;