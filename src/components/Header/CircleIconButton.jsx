import { Button, IconImage } from './CircleIconButtonStyle';

export default function CircleIconButton({ iconSrc, size = 64, onClick, alt = 'icon' }) {
  return (
    <Button onClick={onClick} size={size}>
      <IconImage src={iconSrc} alt={alt} />
    </Button>
  );
}