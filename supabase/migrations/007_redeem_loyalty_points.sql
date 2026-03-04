-- RPC function for atomic loyalty points redemption
CREATE OR REPLACE FUNCTION redeem_loyalty_points(
  p_client_id UUID,
  p_points INTEGER
)
RETURNS SETOF loyalty_clients
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE loyalty_clients
  SET
    points = points - p_points,
    updated_at = now()
  WHERE id = p_client_id
    AND points >= p_points;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Points insuffisants ou client non trouvé';
  END IF;

  RETURN QUERY SELECT * FROM loyalty_clients WHERE id = p_client_id;
END;
$$;
