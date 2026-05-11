

<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/BillaA', function () {
    $billaFormId = request('billaFormId');
    $billaFormData = null;
    if ($billaFormId) {
        $billaFormData = App\Models\BillaRecord::find($billaFormId);
    }
    return Inertia::render('BundleBillaA', [
        'billaFormData' => $billaFormData,
    ]);
})->middleware(['auth', 'verified'])->name('BillaA');

Route::get('/BillaB', function () {
    $billaFormId = request('billaFormId');
    $billaFormData = null;
    if ($billaFormId) {
        $billaFormData = App\Models\BillaRecord::find($billaFormId);
    }
    return Inertia::render('BundleBillaB', [
        'billaFormData' => $billaFormData,
    ]);
})->middleware(['auth', 'verified'])->name('BillaB');

Route::get('/BillaC', function () {
    $billaFormId = request('billaFormId');
    $billaFormData = null;
    if ($billaFormId) {
        $billaFormData = App\Models\BillaRecord::find($billaFormId);
    }
    return Inertia::render('BundleBillaC', [
        'billaFormData' => $billaFormData,
    ]);
})->middleware(['auth', 'verified'])->name('BillaC');

Route::get('/BillaForm', function () {
    return Inertia::render('BillaForm');
})->middleware(['auth', 'verified'])->name('BillaForm');

Route::get('/print-billa', function () {
    $originalOrderId = request('originalOrderId');
    $selectedType = request('selectedType');
    return Inertia::render('PrintBillaSelection', [
        'originalOrderId' => $originalOrderId,
        'selectedType' => $selectedType
    ]);
})->middleware(['auth', 'verified'])->name('print-billa');

Route::post('/print-billa', [App\Http\Controllers\BillaRecordController::class, 'storePrintInfo'])
    ->middleware(['auth', 'verified'])->name('print-billa.store');

Route::post('/BillaForm', [App\Http\Controllers\BillaRecordController::class, 'store'])->middleware(['auth', 'verified'])->name('BillaForm.store');


Route::get('/History', [App\Http\Controllers\HistoryController::class, 'index'])->middleware(['auth', 'verified'])->name('History');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
