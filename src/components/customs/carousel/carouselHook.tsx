import { useEffect, useRef, useState } from "react";

const useCarousel = (cnt: number = 1, showArr: boolean = true) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const maxScrollWidth = useRef(0);
  const [width, setWidth] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [showArrow, setShowArrow] = useState(showArr);
  const [count, setCount] = useState(cnt);
  const [children, setChildren] = useState<JSX.Element[]>([]);

  const updateShowArrow = (value: boolean) => {
    setShowArrow(value)
  }

  const movePrev = () => {
    if (canPrev) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (canNext) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = () => {
    setCanPrev(currentIndex > 0);
    setCanNext(currentIndex < children.length - 1);
    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      const scroll = (width + 36) * currentIndex
      carousel.current.scrollLeft = scroll;
    }
    isDisabled();
  }, [currentIndex]);

  useEffect(() => {
    isDisabled();
  }, [children]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(
        carousel.current
          ? (carousel.current.offsetWidth - count * 32) / count
          : 0
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    setWidth(
      carousel.current ? (carousel.current.offsetWidth - count * 32) / count : 0
    );
  }, []);

  const renderComponent = (idx: number, element: JSX.Element) => {
    return (
      <div
        key={idx}
        className=" max-w-full"
      >
        <div
          className="max-w-full block bg-origin-padding mx-4 bg-left-top bg-cover bg-no-repeat z-0"
          style={{ width: `${width}px` }}
        >
          {element}
        </div>
      </div>
    );
  };

  const updateChildren = <T,>(
    elements: T[],
    fun: (element: T, idx:number) => JSX.Element
  ) => {
    setChildren(
      elements.map((element, idx) => renderComponent(idx, fun(element, idx)))
    );
  };

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.offsetWidth
      : 0;
  }, [width]);


  return {
    width,
    showArrow,
    moveNext,
    movePrev,
    canPrev,
    canNext,
    carousel,
    setCount,
    children,
    updateChildren,
    updateShowArrow,
  };
};

export default useCarousel;
