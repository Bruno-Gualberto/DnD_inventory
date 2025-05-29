import { useEffect } from "react";

export default function Test() {
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {};

  const addContent = async () => {};

  const deleteContent = async () => {};

  return (
    <div>
      <p>Test 1</p>
    </div>
  );
}
