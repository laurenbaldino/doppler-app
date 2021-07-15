function WeatherInfo({ icon, description }) {
  return (
    <p>
      <span class="icon-text">
        <span class="icon">
          <i class={`fas ${icon}`}></i>
        </span>
        <span>{description}</span>
      </span>
    </p>
  );
}

export default WeatherInfo;
