import { Thumbnail } from './NewsImageStyle';
import sampleImg from '../../assets/sample.webp';

export default function NewsImage({ src = sampleImg, alt = 'news image' }) {
    return <Thumbnail src={src} alt={alt} />;
}