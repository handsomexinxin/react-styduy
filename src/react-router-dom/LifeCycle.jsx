import { Component, useEffect } from "react";

export default function LifeCycle(props) {
  const {onMount} = props;
  useEffect(() => {
    const release = {}
    onMount.call(this, release)
    return () => {
      if(release.release) {
        release.release()
      }
    }
  },[])
  return null;
};
