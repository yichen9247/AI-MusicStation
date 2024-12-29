
import developer from "./developer"
import DisableDevtool from 'disable-devtool'
if (import.meta.env.MODE === 'production') DisableDevtool(developer);