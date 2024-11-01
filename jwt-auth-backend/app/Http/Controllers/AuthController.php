<?php

namespace App\Http\Controllers;

use Hash;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;
use Cookie;
use Validator;

class AuthController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function register(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = auth('api')->login($user);

        return response()->json([
            'success' => true,
            'message' => 'Usuario registrado exitosamente',
        ])->cookie('jwt_token', $token, 60, null, null, false, true);
        
    }
    
    // public function login(Request $request)
    // {
    //     $credentials = $request->only('email', 'password');
        
    //     if (!$token = JWTAuth::attempt($credentials)) {
    //         return response()->json(['error' => 'Unauthorized'], 401);
    //     }

    //     // Set the token in an HTTP-only cookie
    //     return response()->json(['success' => true])
    //         ->cookie('token', $token, 60, null, null, false, true);
    // }
    
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json(['success' => true])
            ->cookie('jwt_token', $token, 60, null, null, false, true);
    }

    public function logout()
    {
        $token = request()->cookie('jwt_token');
        
        if ($token) {
            JWTAuth::setToken($token)->invalidate();
        }

        return response()->json(['success' => true])
            ->cookie('jwt_token', null, -1);
    }

    // public function logout()
    // {
    //     auth()->logout();
    //     $cookie = Cookie::forget('jwt_token');
        
    //     return response()->json(['message' => 'Successfully logged out'])
    //         ->withCookie($cookie);
    // }

    public function me()
    {
        try {
            // return response()->json(auth()->user());
            $token = request()->cookie('jwt_token');
            
            if (!$token) {
                return response()->json(['error' => 'Token not found'], 401);
            }

            // JWTAuth::setToken($token);
            // $user = JWTAuth::authenticate();
            $user = JWTAuth::setToken($token)->toUser();
            
            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            return response()->json($user);
    
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['error' => 'Token expired'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['error' => 'Token invalid'], 401);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
